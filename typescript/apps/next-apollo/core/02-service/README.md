## Services

- Create one service per page.
- All use cases that can be manipulated from the framework are defined in this layer.
- Operate communication with api-gateway and store that are to the use case.
    - Values retrieved from the server side are converted to Model instances and stored in the store, or directly passed to the View.
- The value of the store can be passed to the View via a getter.