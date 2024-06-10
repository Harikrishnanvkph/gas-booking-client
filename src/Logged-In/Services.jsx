import '../css/SP.css';
import Card from './Card';
import SelectLabels from './SelectLabels';
import { useSelector } from 'react-redux';

function Services(){
    const category = useSelector((state)=>state.gasStore.categorySelected);
    const droplist = useSelector((state)=>state.gasStore.droplist);
    const provider = useSelector((state)=>state.gasStore.providerSelected);
    const icon = useSelector((state)=>state.gasStore.icons);
    


    return<>
        <div className="container-fluid serviceprovider">
            <SelectLabels />
            <hr/>
            <div className='row alter'>
                {
                    category == "All" && provider == "All" ?
                    Object.entries(droplist).map(([key,value])=>(
                        value.map((lm,index)=>(
                            <div className='col-lg-3 col-md-4 col-sm-6 cards' key={index}>
                                <Card obj={lm} category={key} imageurl={icon[lm["company"]]} />
                            </div>
                        ))
                    ))
                    : category == "All" && provider != "All" ?
                    Object.entries(droplist).map(([key,value])=>(
                        value.map((lm,index)=>(
                            provider == lm["company"] ?
                            <div className='col-lg-3 col-md-4 col-sm-6 cards' key={index}>
                                <Card obj={lm} category={key} imageurl={icon[lm["company"]]}/>
                            </div> : null
                        ))
                    ))
                    :
                    droplist[category]?.map((at,index) => (
                        at["company"] === provider ?
                        <div className='col-lg-3 col-md-4 col-sm-6 cards' key={index}>
                            <Card obj={at} category={category} imageurl={icon[at["company"]]}/>
                        </div> : provider == "All" || provider == "" ?
                        <div className='col-lg-3 col-md-4 col-sm-6 cards' key={index}>
                            <Card obj={at} category={category} imageurl={icon[at["company"]]}/>
                        </div> : null
                    ))
                }
            </div>
        </div>
    </>
}


export default Services