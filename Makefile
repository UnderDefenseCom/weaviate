include .env

prometheus-yml:
	yq e -i '.global.external_labels.monitor = "monitor-${MY_ENV}"' prometheus/prometheus.yml
	yq e -i '.remote_write[0].url = "${REMOTE_WRITE_URL}"' prometheus/prometheus.yml
	yq e -i '.scrape_configs[0].job_name = "weaviate-${MY_ENV}"' prometheus/prometheus.yml
	yq e -i '.scrape_configs[0].static_configs[0].targets[0] = "${TARGET}"' prometheus/prometheus.yml
	yq e -i '.scrape_configs[1].job_name = "node_exporter-${MY_ENV}"' prometheus/prometheus.yml

install-node-exporter:
	curl -fsSL https://gist.githubusercontent.com/PrettySolution/974745d67c8db1b2fdcfec23cb875847/raw/4353d173d24cb45fca1bcb3a4e08f9f686998e44 | bash