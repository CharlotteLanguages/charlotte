package models

import "github.com/jinzhu/gorm"

type persona struct {
	gorm.Model

	ID        int64  `json:"idPerson"`
	Nombre    string `json:"name"`
	LastName  string `json:"lastname"`
	Birthdate string `json:"birthdate"`
	Gender    string `json:"gender"`
	Email     string `json:"email"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}
