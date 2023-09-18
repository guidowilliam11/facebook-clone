package service

import (
	"context"

	"github.com/guidowilliam11/server/graph/model"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func UserRegister(ctx context.Context, input model.NewUser) (interface{}, error) {
	// Check Email
	_, err := UserGetByEmail(ctx, input.Email)
	if err == nil {
		// if err != record not found
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}

	createdUser, err := UserCreate(ctx, input)
	if err != nil {
		return nil, err
	}

	token, err := JwtGenerate(ctx, createdUser.ID)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"token": token,
	}, nil
}

func UserLogin(ctx context.Context, email string, password string) (string, error) {
	getUser, err := UserGetByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return "", &gqlerror.Error{
				Message: "user not found",
			}
		}
		return "", err
	}

	if !model.CheckPasswordHash(password, getUser.Password) {
		return "", nil
	}

	token, err := JwtGenerate(ctx, getUser.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}
