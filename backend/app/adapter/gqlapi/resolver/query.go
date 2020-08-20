package resolver

// Query represents GraphQL query resolver
type Query struct {
}

// AuthQueryArgs represents possible parameters for AuthQuery endpoint
type AuthQueryArgs struct {
	AuthToken *string
}

// AuthQuery extracts user information from authentication token
func (q Query) AuthQuery(args *AuthQueryArgs) (*AuthQuery, error) {
	authQuery := newAuthQuery(args.AuthToken)
	return &authQuery, nil
}

func newQuery() Query {
	return Query{}
}
