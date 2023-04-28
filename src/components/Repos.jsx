import api from '../service/api';
import { Clear, Search } from '@mui/icons-material';
import { Box,Select,MenuItem,FormControl,InputLabel, TextField, InputBase, Paper, Divider,IconButton   } from '@mui/material';
import {useState, useEffect} from 'react'; 
import DataTable from 'react-data-table-component';
import moment, * as moments from 'moment';
import 'moment/dist/locale/pt-br';

const Repos = () => {  
    const [repos, setRepos] = useState([]);
    const [search,setSearch] = useState('');
    const [op,setOp] = useState(0);
    const [repoFiltrado,setRepoFiltrado] = useState ([]);
    
    useEffect(() => {
        api.get('/users/sandrotoline/repos').then((resp) => {
            setRepos(resp.data.filter((repo) => repo.language != null));           
            setRepoFiltrado(resp.data.filter((repo) => repo.language != null));
        });
    }, [])
    //GetRepo
   
    const handleChange = (event) => {
        setOp(event.target.value);
        setSearch('');
        if(event.target.value == 0){setRepoFiltrado(repos.filter((repo) => repo.language != null))}
        if(event.target.value == 1){setRepoFiltrado(repos.filter((item) => item.archived == true))}
        if(event.target.value == 2){setRepoFiltrado(repos.filter((item) => item.disabled == true))}
    };
    
    const handleSearch = () => {
        console.log(search);
        console.log(op);
        if(search == ''){
            if(op == 0){setRepoFiltrado(repos.filter((repo) => repo.language != null))}
            if(op == 1){setRepoFiltrado(repos.filter((item) => item.archived == true))}
            if(op == 2){setRepoFiltrado(repos.filter((item) => item.disabled == true))}
        }
        if(search != ''){
            if(op == 0){setRepoFiltrado(repos.filter((item) => item.language.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())))}
            if(op == 1){setRepoFiltrado(repos.filter((item) => (item.language.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())) && item.archived == true) )}
            if(op == 2){setRepoFiltrado(repos.filter((item) => (item.language.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())) && item.disabled == true) ) }
        }
      

    }  

    function formateDate(date){
        return moment(date).locale('pt-br').format('L');
    }

       const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nome',
            selector: row => (row.name.toLowerCase()),
            sortable: true,
            grow: 2,
            cell: row=> row.name
        },
        {
            name: 'Linguagem',
            selector: row => row.language,
            sortable: true,
        },
        {
            name: 'Ultimo Commit',
            selector: row => row.updated_at,
            sortable: true,
            cell: row=> (formateDate(row.updated_at))
        },
        {
            name: 'Desabilitado ?',
            selector: row => row.disabled,
            center:true,
            cell: row=> (  <div className={`bullet ${row.disabled ? "yes" : ""}`}>{row.disabled ? 'Sim' : 'Não'}</div> )
        },
        {
            name: 'Arquivado',
            center:true,
            selector: row => row.archived,
            cell: row=> (  <div className={`bullet ${row.archived ? "yes" : ""}`}>{row.archived ? 'Sim' : 'Não'}</div> )
        },
        {  
            name: 'Link',
            cell: row => (  <a href={row.html_url} className="btn-link" target="_blank">Abrir</a>),
            right:true
        },

    ];
    return (
        <div className="repositories">
            <div className="filter">
                <h2>Repositórios disponiveis</h2>
                <div className='FilterInputs'>
                        {/* <TextField id="inputSearch" label="Busque uma linguagem" variant="outlined" value={search} onChange={handleSearch}  className="InputSearch"/> */}
                        <Paper
                            component="form" className='formBusca'
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Busca"
                                className='inputBusca'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" className="dividerBusca"/>
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"  onClick={handleSearch}>
                                <Search className='IconBusca'/>
                            </IconButton>
                        </Paper>
                        <Box className="formSelect">
                            <FormControl fullWidth className="InputSelect">
                                <InputLabel id="labelFiltro">Filtro</InputLabel>
                                <Select
                                    labelId="labelFiltro"
                                    id="labelFiltro-select"
                                    value={op}
                                    label="Filtro"
                                    onChange={handleChange}
                                >
                                <MenuItem value={0}>Todos</MenuItem>
                                <MenuItem value={1}>Arquivados</MenuItem>
                                <MenuItem value={2}>Desabilitado</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
            </div>

             <DataTable
                columns={columns}
                data={repoFiltrado}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="285px"
                theme='dark'
                className='tableRepo'
                
            />
        </div>
    )
} 
export default Repos;