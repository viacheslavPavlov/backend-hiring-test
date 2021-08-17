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
      "start_lat": 40, 
      "start_long": 50,
      "end_lat": 40, 
      "end_long": 50,
      "rider_name": "John rider",
      "driver_name": "Michel Knight",
      "driver_vehicle": "Ford GT550",
      "created": "Ford GT550"
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
      "start_lat": 40, 
      "start_long": 50,
      "end_lat": 0, 
      "end_long": 0,
      "rider_name": "John rider",
      "driver_name": "Michel Knight",
      "driver_vehicle": "Ford GT550",
      "created": "Ford GT550"
     },
    {
      "rideID": 2,
      "start_lat": 0, 
      "start_long": 0,
      "end_lat": 40, 
      "end_long": 50,
      "rider_name": "Sam stone",
      "driver_name": "Michel Knight",
      "driver_vehicle": "Ford GT550",
      "created": "Ford GT550"
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
      "start_lat": 40,
      "start_long": 50,
      "end_lat": 0,
      "end_long": 0,
      "rider_name": "John rider",
      "driver_name": "Michel Knight",
      "driver_vehicle": "Ford GT550",
      "created": "Ford GT550"
    }
  ```


- Server error response (status `200`):
  ```json
   {
      "error_code": "SERVER_ERROR",
      "message": "Unknown error"
   }
  ```