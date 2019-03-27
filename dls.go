package main

import (
	"html"
	"html/template"
	"log"
	"net"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/mux"
)

type tmplFill struct {
	Title    string
	SubTitle string
}

func main() {
	var port = os.Getenv("dls_port")

	if port == "" {
		port = "3030"
	}

	router := mux.NewRouter()
	router.HandleFunc("/", handleRequest)
	router.NotFoundHandler = http.HandlerFunc(handleRequest)

	http.Handle("/", router)

	http.Handle("/vendor/", http.FileServer(http.Dir("static")))
	http.Handle("/img/", http.FileServer(http.Dir("static")))
	http.Handle("/css/", http.FileServer(http.Dir("static")))

	log.Println("Running...")
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("template/index.html"))
	tmpl.Execute(w, resolveFill(r.Host))
}

func resolveFill(host string) tmplFill {
	records, err := net.LookupTXT(host)

	fill := tmplFill{Title: html.EscapeString(host), SubTitle: ""}
	if err != nil {
		return fill
	}

	for _, record := range records {

		if strings.HasPrefix(record, "dls_title=") {
			fill.Title = html.EscapeString(strings.Replace(record, "dls_title=", "", 1))
		}

		if strings.HasPrefix(record, "dls_subtitle=") {
			fill.SubTitle = html.EscapeString(strings.Replace(record, "dls_subtitle=", "", 1))
		}
	}

	return fill
}
