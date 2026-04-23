# Experiment 11: Microservice-Based Backend Architecture

## 📋 Description
This experiment demonstrates the design and implementation of a microservices-based backend architecture. It showcases how to build independent, scalable services (Customer Service and Order Service) that communicate with each other, following industry best practices for distributed systems.

## 🎯 Learning Outcomes
After completing this experiment, you will be able to:
1. Design and implement independent microservices with distinct responsibilities
2. Set up isolated Python environments for each service using `venv`
3. Implement inter-service HTTP communication using the `requests` library
4. Build RESTful API endpoints for microservices
5. Understand service discovery and communication patterns
6. Handle asynchronous service-to-service calls
7. Debug and test distributed systems
8. Deploy and manage multiple services

## 🛠 Technologies Used
- **Backend Framework**: Flask
- **Language**: Python 3.7+
- **HTTP Library**: requests
- **Environment Isolation**: venv
- **Architecture Pattern**: Microservices
- **Data Format**: JSON

## 📁 Project Structure
```
exp-11/
├── micro-services-lab/
│   ├── customer-service/        # Customer Service
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   ├── venv-customer/       # Virtual environment
│   │   └── routes/
│   │       └── customer_routes.py
│   ├── order_service/           # Order Service
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   ├── venv-order/          # Virtual environment
│   │   └── routes/
│   │       └── order_routes.py
│   └── README.md
├── screenshots/                 # Documentation
└── readme.md
```

## 🏗 Microservices Architecture

### Customer Service (Port: 5000)
- Manages customer data
- Retrieves customer information
- Calls Order Service to get order details

### Order Service (Port: 5001)
- Manages order data
- Provides order information
- Independent from Customer Service

## 🎨 API Endpoints

### Customer Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customers` | Get all customers |
| GET | `/customers/<id>` | Get customer by ID with orders |
| GET | `/customers/<id>/orders` | Get customer's orders |
| POST | `/customers` | Create new customer |
| PUT | `/customers/<id>` | Update customer |
| DELETE | `/customers/<id>` | Delete customer |

### Order Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Get all orders |
| GET | `/orders/<id>` | Get order by ID |
| GET | `/orders/customer/<customer_id>` | Get orders by customer ID |
| POST | `/orders` | Create new order |
| PUT | `/orders/<id>` | Update order |
| DELETE | `/orders/<id>` | Delete order |

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

**Step 1: Setup Order Service**
```bash
cd exp-11/micro-services-lab/order_service

# Create virtual environment
python -m venv venv-order

# Activate virtual environment
# On Windows:
venv-order\Scripts\activate
# On macOS/Linux:
source venv-order/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Step 2: Setup Customer Service**
```bash
cd ../customer-service

# Create virtual environment
python -m venv venv-customer

# Activate virtual environment
# On Windows:
venv-customer\Scripts\activate
# On macOS/Linux:
source venv-customer/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Services

**Terminal 1 - Order Service**
```bash
cd exp-11/micro-services-lab/order_service
source venv-order/bin/activate  # or venv-order\Scripts\activate on Windows
python app.py
# Service runs on http://localhost:5001
```

**Terminal 2 - Customer Service**
```bash
cd exp-11/micro-services-lab/customer-service
source venv-customer/bin/activate  # or venv-customer\Scripts\activate on Windows
python app.py
# Service runs on http://localhost:5000
```

## 📝 Usage Examples

### Get Customer with Orders
```bash
curl http://localhost:5000/customers/1
```

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "orders": [
    {
      "id": 101,
      "customer_id": 1,
      "product": "Laptop",
      "amount": 1200
    },
    {
      "id": 102,
      "customer_id": 1,
      "product": "Mouse",
      "amount": 25
    }
  ]
}
```

### Create Order
```bash
curl -X POST http://localhost:5001/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "product": "Keyboard",
    "amount": 75
  }'
```

## 🔧 Inter-Service Communication

Customer Service calls Order Service:

```python
import requests

def get_customer_with_orders(customer_id):
    # Fetch customer data
    customer = get_customer_from_db(customer_id)
    
    # Call Order Service to get orders
    try:
        response = requests.get(
            f'http://localhost:5001/orders/customer/{customer_id}',
            timeout=5
        )
        orders = response.json() if response.status_code == 200 else []
        customer['orders'] = orders
    except requests.RequestException as e:
        print(f"Error calling Order Service: {e}")
        customer['orders'] = []
    
    return customer
```

## 🏛 Microservices Architecture Principles

1. **Single Responsibility** – Each service handles one business domain
2. **Independent Deployment** – Services can be deployed separately
3. **Isolated Environments** – Separate venv for each service
4. **Network Communication** – HTTP for service-to-service calls
5. **Scalability** – Services can be scaled independently
6. **Resilience** – Graceful handling of service failures

## ⚙️ Service Configuration

### Environment Variables
```bash
# .env for Customer Service
FLASK_ENV=development
FLASK_PORT=5000
ORDER_SERVICE_URL=http://localhost:5001

# .env for Order Service
FLASK_ENV=development
FLASK_PORT=5001
```

## 🧪 Testing Inter-Service Communication

```bash
# 1. Verify Order Service is running
curl http://localhost:5001/orders

# 2. Verify Customer Service is running
curl http://localhost:5000/customers

# 3. Test full aggregation
curl http://localhost:5000/customers/1

# 4. Create test data and verify data flow
```

## ✅ Conclusion
This experiment provides comprehensive understanding of microservices architecture, demonstrating how to build scalable, independent services that work together as a cohesive system. It covers essential distributed systems concepts including service isolation, inter-service communication, and independent deployment—critical skills for modern backend development.

