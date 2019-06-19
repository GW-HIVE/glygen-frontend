html_root=/var/www/

usage()
{
	echo "Sets URLs in domain_urls.js"
        echo "usage: ./set_urls.sh [OPTIONS] -a [api url] -s [sparql url] -d [data url]"
        echo "options:"
        echo "            -a [api url]         Root of API"
        echo "            -s [sparql url]      Root of sparql"
        echo "            -d [data url]        Root of datasetviewer"
        echo ""
        echo "            -p [html root]    html root, if not supplied defaults to /var/www"
        echo ""
        echo "examples:    ./set_urls.sh -d https://glygen.ccrc.uga.edu/glygen/data -a https://glygen.ccrc.uga.edu/glgyen/api/ -s https://glygen.ccrc.uga.edu/glygen/sparql/"
        echo "examples:    ./set_urls.sh -p /opt/apache/ -d /data -a /api/ -s /sparql/"
        exit 3
}

if [ "$1" == "--help" ]; then
    usage; exit 0
fi

while getopts :a:s:d:p: OPTNAME; do
        case "$OPTNAME" in
        a)      api_url="$OPTARG";;
        s)      sparql_url="$OPTARG";;
        d)      data_url="$OPTARG";;
        p)      html_root=("$OPTARG");;
        *)      usage;;
        esac
done

if [ -z $api_url ]
then
   usage; exit 0
fi

if [ -z $sparql_url ]
then
   usage; exit 0
fi

if [ -z $data_url ]
then
   usage; exit 0
fi

# in /var/www/html/glygen/js/domain_url.js
# set ws_base to api_url
sed -ri "s/^(var\s*ws_base\s*=\s*).*/\1'${api_url//\//\\/}';/" $html_root/html/glygen/js/domain_url.js

# set ws_base_data to data_url
sed -ri "s/^(var\s*ws_base_data\s*=\s*).*/\1'${data_url//\//\\/}';/" $html_root/html/glygen/js/domain_url.js

# set ws_base_sparql to sparql_url
sed -ri "s/^(var\s*ws_base_sparql\s*=\s*).*/\1'${sparql_url//\//\\/}';/" $html_root/html/glygen/js/domain_url.js
