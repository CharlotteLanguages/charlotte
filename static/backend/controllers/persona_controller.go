package controllers

import (
	commons "charlotte/static/backend/commons"
	"charlotte/static/backend/models"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func GetAll(writer http.ResponseWriter, request *http.Request) {
	personas := []models.Persona{}
	db := commons.GetConnection()
	defer db.Close()

	db.Find(&personas)
	json, _ := json.Marshal(personas)
	commons.SendResponse(writer, http.StatusOK, json)
}

func Get(writer http.ResponseWriter, request *http.Request) {
	persona := models.Persona{}

	id := mux.Vars(request)["idPerson"]

	db := commons.GetConnection()
	defer db.Close()

	db.Find(&persona, id)

	if persona.ID > 0 {
		json, _ := json.Marshal(persona)
		commons.SendResponse(writer, http.StatusOK, json)
	} else {
		commons.SendError(writer, http.StatusNotFound)
	}
}

func Save(writer http.ResponseWriter, request *http.Request) {
	persona := models.Persona{}

	db := commons.GetConnection()
	defer db.Close()

	error := json.NewDecoder(request.Body).Decode(&persona)

	if error != nil {
		log.Fatal(error)
		commons.SendError(writer, http.StatusBadRequest)
		return
	}

	error = db.Create(&persona).Error

	if error != nil {
		log.Fatal(error)
		commons.SendError(writer, http.StatusInternalServerError)
		return
	}

	json, _ := json.Marshal(persona)

	commons.SendResponse(writer, http.StatusCreated, json)
}

func Delete(writer http.ResponseWriter, request *http.Request) {
	persona := models.Persona{}

	db := commons.GetConnection()
	defer db.Close()

	id := mux.Vars(request)["idPerson"]

	db.Find(&persona, id)

	if persona.ID > 0 {
		db.Delete(persona)
		commons.SendResponse(writer, http.StatusOK, []byte(`{}`))
	} else {
		commons.SendError(writer, http.StatusNotFound)
	}
}
