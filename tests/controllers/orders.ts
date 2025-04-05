import { Request, Response, NextFunction } from 'express';
import { getOrders } from '../../controllers/ordersController';
import { request } from 'undici'

jest.mock('undici', () => ({
  request: jest.fn()
}));

describe('Orders Controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockNext: jest.MockedFunction<NextFunction>

  beforeEach(() => {

    jest.clearAllMocks();

    mockRequest = {
      query: {},
      reverbToken: 'test-token'
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mockNext = jest.fn()
  })

  describe('getOrders', () => {
    it('should fetch and return orders successfully', async () => {
      const mockOrdersData = {
        orders: [
          { id: '1', title: 'Test Order 1' },
          { id: '2', title: 'Test Order 2' }
        ],
        total: 2,
        current_page: 1,
        total_pages: 1
      };

      (request as jest.Mock).mockResolvedValue({
        statusCode: 200,
        body: {
          json: jest.fn().mockResolvedValue(mockOrdersData)
        }
      });

      await getOrders(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(request).toHaveBeenCalledWith(
        expect.stringContaining('https://api.reverb.com/api/my/orders/selling/all'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token'
          })
        })
      );
      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockOrdersData
        })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should handle API errors correctly', async () => {
      const errorResponse = {
        statusCode: 403,
        body: {
          json: jest.fn().mockResolvedValue({ errors: ['Unauthorized'] })
        }
      };
      
      (request as jest.Mock).mockResolvedValue(errorResponse);

      await getOrders(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 403,
          message: 'Error fetching data from Reverb API'
        })
      );
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should use custom date range when provided', async () => {
      mockRequest.query = {
        start_date: '2023-01-01',
        end_date: '2023-01-31',
        date_type: 'created'
      };
      
      (request as jest.Mock).mockResolvedValue({
        statusCode: 200,
        body: {
          json: jest.fn().mockResolvedValue({ orders: [] })
        }
      });

      await getOrders(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(request).toHaveBeenCalledWith(
        expect.stringContaining('created_start_date=2025-01-01'),
        expect.anything()
      );
      expect(request).toHaveBeenCalledWith(
        expect.stringContaining('created_end_date=2025-01-31'),
        expect.anything()
      );
    });

    it('should handle unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error');
      (request as jest.Mock).mockRejectedValue(unexpectedError);


      await getOrders(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(unexpectedError);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });
});