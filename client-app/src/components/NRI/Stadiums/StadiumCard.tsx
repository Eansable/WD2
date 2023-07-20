import { StadiumType } from "./types"

interface PropsType {
    stadium: StadiumType
}

const StadiumCard = ({stadium}: PropsType) => {
    
    return <div> 
        <div className="foto"></div>
        <div>{stadium.name}</div>        
        <div>{stadium.adress}</div>        
        <div>{stadium.description}</div>        
    </div>
}

export default StadiumCard