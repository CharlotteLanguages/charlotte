package main

import (
	"log"
	"net/http"
	"os"
)

func main() {

	fs := http.FileServer(http.Dir("./static/frontend"))
	http.Handle("/", fs)

	log.Println("Servidor corriendo...")

	port := os.Getenv(("PORT"))

	if port == "" {
		port = (":3000")
	}

	// log.Fatal(app.Listen("0.0.0.0:" + port))

	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
