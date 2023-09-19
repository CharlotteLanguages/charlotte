package common

import (
	"charlotte/static/backend/models"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

func GetConnection() (conexion *gorm.DB) {
	Driver := "mysql"
	Usuario := "root"
	Contrasenia := "F6AtyZ6hZSIB48Zl1mW2"
	Nombre := "railway"

	conexion, err := gorm.Open(Driver, Usuario+":"+Contrasenia+"@tcp(containers-us-west-153.railway.app:5905)/"+Nombre)
	if err != nil {
		panic(err.Error())
	}
	return conexion
}

func Migrate() {
	conexion := GetConnection()
	defer conexion.Close()

	log.Println("Migrando...")

	conexion.AutoMigrate(&models.Persona{})

}
