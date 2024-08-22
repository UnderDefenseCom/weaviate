include .env

prometheus-yml:
	yq e -i '.global.external_labels.monitor = "monitor-${MY_ENV}"' prometheus/prometheus.yml
	yq e -i '.remote_write[0].url = "${REMOTE_WRITE_URL}"' prometheus/prometheus.yml
	yq e -i '.scrape_configs[0].job_name = "weaviate-${MY_ENV}"' prometheus/prometheus.yml
	yq e -i '.scrape_configs[0].static_configs[0].targets[0] = "${TARGET}"' prometheus/prometheus.yml
