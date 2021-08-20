## Riders model

### 1. General description

### 2. Scheme

```typescript
interface Ride {
  "rideID": number, // PRIMARY KEY AUTOINCREMENT
  "start_lat": number // NOT NULL (>= 0; <= 90)
  "start_long": number, // NOT NULL (>= 0; <= 180)
  "end_lat": number, // NOT NULL (>= 0; <= 90)
  "end_long": number, // NOT NULL (>= 0; <= 180)
  "rider_name": string // NOT NULL
  "driver_name": string // NOT NULL
  "driver_vehicle": string // NOT NULL
  "created": number // default CURRENT_TIME_STAMP 
}
```

### 3. Endpoints

1. `POST`: `/riders` to add a new ride

- Request body:
  ```json
    {
      "start_lat": 40, 
      "start_long": 50,
      "end_lat": 40, 
      "end_long": 50,
      "rider_name": "John rider",
      "driver_name": "Michel Knight",
      "driver_vehicle": "Ford GT550"
    }
  ```
- Success response (status `200`):
  ```json
      {
      "rideID": 1,
      "startLat": 40,
      "startLong": 50,
      "endLat": 40,
      "endLong": 50,
      "riderName": "John rider",
      "driverName": "Michel Knight",
      "driverVehicle": "Ford GT550"
    }
  ```

- Validation error response (status `200`):
  ```json
   {
      "error_code": "VALIDATION_ERROR",
      "message": "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
   }
   ```

- Server error response (status `200`):
  ```json
   {
      "error_code": "SERVER_ERROR",
      "message": "Unknown error"
   }
  ```

2. `GET`: `/rides` to fetch all rides from DB

- Success response (status `200`):
  ```json
  [
    {
      "rideID": 1,
      "startLat": 40,
      "startLong": 50,
      "endLat": 40,
      "endLong": 50,
      "riderName": "John rider",
      "driverName": "Michel Knight",
      "driverVehicle": "Ford GT550"
    },
    {
      "rideID": 2,
      "startLat": 40,
      "startLong": 50,
      "endLat": 40,
      "endLong": 50,
      "riderName": "John rider",
      "driverName": "Michel Knight",
      "driverVehicle": "Ford GT550"
    }
  ]
  ```


- Server error response (status `200`):
  ```json
   {
      "error_code": "SERVER_ERROR",
      "message": "Unknown error"
   }
  ```
  

3. `GET`: `/rides/:id` to fetch ride with some id from DB

- Success response (status `200`):
  ```json
    {
      "rideID": 1,
      "startLat": 40,
      "startLong": 50,
      "endLat": 40,
      "endLong": 50,
      "riderName": "John rider",
      "driverName": "Michel Knight",
      "driverVehicle": "Ford GT550"
    }
  ```


- Server error response (status `200`):
  ```json
   {
      "error_code": "SERVER_ERROR",
      "message": "Unknown error"
   }
  ```

4. `GET`: `/rides/p/:page?size=:size` to fetch page of rides

- Success response (status `200`):
  ```json
    {
    "content": [
      {
        "rideID": 1,
        "startLat": 40,
        "startLong": 50,
        "endLat": 40,
        "endLong": 50,
        "riderName": "John rider",
        "driverName": "Michel Knight",
        "driverVehicle": "Ford GT550",
        "created": "2021-08-20 10:07:40"
      }
    ],
    "page": 1,
    "size": 20,
    "total": 1
  }

  ```


- Server error response (status `500`):
  ```json
   {
      "error_code": "SERVER_ERROR",
      "message": "Unknown error"
   }
  ```
