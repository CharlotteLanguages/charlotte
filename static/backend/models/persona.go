package models

import "github.com/jinzhu/gorm"

type Persona struct {
	gorm.Model

	ID        int64  `json:"idPerson" gorm:"primary_key; auto_increment"`
	Nombre    string `json:"name"`
	LastName  string `json:"lastname"`
	Birthdate string `json:"birthdate"`
	Gender    string `json:"gender"`
	Email     string `json:"email"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}
