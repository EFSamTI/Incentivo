export interface IApiTally {
    api_tally_id: number;
    uuid: string;
    nombre: string;
    url_base: string;
    parametros: string[];
  }

  const fetchTallyApi = async (api: IApiTally, fechas: string[]) => {
    const responses:any[] = [];
    if (api.parametros.length === 1) {
        for (const fecha of fechas) {
            const url = `${api.url_base}/${api.uuid}/?${api.parametros[0]}=${fecha}`; 
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                responses.push( null );
            } else {
                const data = await response.json();
                responses.push(data);
            }
        }
      
    } else if (api.parametros.length === 2) {
        const url = `${api.url_base}/${api.uuid}/?${api.parametros[0]}=${fechas[0]}&${api.parametros[1]}=${fechas[fechas.length - 1]}`;
        console.log(url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            responses.push(null);
        } else {
            const data = await response.json();
            if (Array.isArray(data)) {
                responses.push(...data);
            } else {
                responses.push(data);
            }
        }
    }else{
        return { status: 400, message: "No se encontraron apis tally en la base de datos" };
    }

    return { status: 200, data: responses.flat(Infinity) };
  }


  export { fetchTallyApi };