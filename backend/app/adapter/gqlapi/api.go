package gqlapi

import (
	"github.com/short-d/app/fw/filesystem"
	"github.com/short-d/app/fw/graphql"
	"github.com/short-d/teamy/backend/app/adapter/gqlapi/resolver"
)

// NewTeamy creates GraphQL API config
func NewTeamy(
	schemaPath string,
	fileSystem filesystem.FileSystem,
	r resolver.Resolver,
) (graphql.API, error) {
	buf, err := fileSystem.ReadFile(schemaPath)
	if err != nil {
		return graphql.API{}, err
	}
	return graphql.API{
		Schema:   string(buf),
		Resolver: &r,
	}, nil
}
