## View

- The code for the screen that will actually be displayed to the user.
- Loosely coupled with core module (service etc...) and configured as a separate framework.
- It has one corresponding service and basically flows the values obtained from it directly to the component template.
    - As an exception, data shared with the server side or another page (component) that does not need to be updated in real time can be a property of the View.
        - For example) input form.
- Direct access to the store is prohibited.