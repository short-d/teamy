package resolver

// Resolver contains GraphQL request handlers.
type Resolver struct {
	Query
	Mutation
}

// NewResolver creates a new GraphQL resolver.
func NewResolver() Resolver {
	return Resolver{
		Query:    newQuery(),
		Mutation: newMutation(),
	}
}
