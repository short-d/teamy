package resolver

import "github.com/short-d/teamy/backend/app/entity"

type User struct {
	user entity.User
}

func (u User) ID() string {
	return u.user.ID
}

func (u User) Name() *string {
	return u.user.Name
}

func (u User) AvatarURL() *string {
	return u.user.AvatarURL
}
