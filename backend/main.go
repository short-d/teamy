package main

import (
	"github.com/short-d/app/fw/filesystem"
	"github.com/short-d/app/fw/service"
	"github.com/short-d/teamy/backend/app/adapter/gqlapi"
	"github.com/short-d/teamy/backend/app/adapter/gqlapi/resolver"
)

func main() {
	fs := filesystem.NewLocal()
	r := resolver.NewResolver()
	schemaPath := "app/adapter/gqlapi/schema.graphql"
	api, err := gqlapi.NewTeamy(schemaPath, fs, r)
	if err != nil {
		panic(err)
	}
	graphqlService := service.
		NewGraphQLBuilder("Teamy").
		Schema(api.Schema).
		Resolver(api.Resolver).
		Build()
	graphqlService.StartAndWait(8080)
}
