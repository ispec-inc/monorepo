# jam-roll/go/svc/collaboration/pkg/domain
This package is a set of codes implemented by domain-driven development.

## How to write domain model

The important points are
- Implement the domain modeling directly as code.
- Use use case word as a method name.
- Use the value object to define the columns of the domain model.
- Separate model packages at transaction boundaries.

### Implement the domain modeling directly as code.
Basically, domain modeling must be done with a domain expert before implementing a domain model.

See also
- [Domain Modeling](https://www.notion.so/ispec/fd2f28d628a2426aa5c247622282d9f5)

### Use use case word as a method name.
When initializing a domain model or updating a column, it is not allowed to assign struct values directly from the use case.

Instead, implement words like "start recording" and "save recording" as method names, as they appear in the use cases, and initialize and update the data in them.

```uc.go
// BAD

r := recording.Recording{
    Title: "title"
}

// GOOD

r := recording.Start(
    "title",
)
```


```uc.go
// BAD
r.Status = RecordingSaveStatus

// GOOD
r.Save()
```

This has the following advantages
- Aggregating domain model behaviors into model packages allows use cases to invoke the encapsulated behaviors.
- By properly defining the validation in the behavior, the use cases do not have to implement the business rules.

### Use the value object to define the columns of the domain model.
In implementing the domain model, it is important to make sure that data that cannot exist due to business rules cannot be generated. To achieve this, let's implement a value object and implement validation on its type.

```value.go
type ImageURL string

func (i ImageURL) IsValid() bool {
	_, err := url.ParseRequestURI(string(i))
	if err != nil {
		return false
	}

	return true
}

```

The ID is also properly defined as a value object. This will make it clear which domain model depends on which model.

```user.go
pacakge user

type ID int64

type User struct {
    ID ID
}
```

```team.go
package team

type ID int64

type Team struct {
    ID ID
    UserIDList []user.ID
}
```

By defining it this way, `user` will get a circular reference when it tries to call the `team` package.
In other words, it prevents modules from depending on each other.

### Separate model packages at transaction boundaries.

Basically, a command takes a single aggregate (or domain model), and in order to put a transaction in the implementation of the command, the aggregate defines the data that you want to create together in a single transaction.
