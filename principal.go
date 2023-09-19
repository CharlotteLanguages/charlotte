package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Static("/", "./static/frontend")

	app.Get("/env", func(c *fiber.Ctx) error {
		return c.SendString("Hello, ENV! " + os.Getenv("TEST_ENV"))
	})

	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))
}

// package main

// import (
// 	"log"
// 	"net/http"

// 	"github.com/4softwaredevelopers/demo-crud-api-rest-go/commons"
// 	"github.com/4softwaredevelopers/demo-crud-api-rest-go/routes"
// 	"github.com/gorilla/mux"
// )

// func main() {
// 	commons.Migrate()

// 	router := mux.NewRouter()
// 	routes.SetPersonaRoutes(router)
// 	commons.EnableCORS(router)

// 	server := http.Server{
// 		Addr:    ":3000",
// 		Handler: router,
// 	}

// 	log.Println("Servidor ejecutandose sobre el puerto 9000")
// 	log.Println(server.ListenAndServe())
// }
