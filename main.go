package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/location", getLocation).Methods("POST")

	handler := cors.Default().Handler(r)
	http.ListenAndServe(":8000", handler)
}

func getLocation(w http.ResponseWriter, r *http.Request) {
	location := location{}
	json.NewDecoder(r.Body).Decode(&location)
	fmt.Println(location)
}
