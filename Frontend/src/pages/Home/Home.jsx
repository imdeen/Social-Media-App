import PostSide from "../../components/PostSide/PostSide"
import Profileside from "../../components/ProfileSide/ProfileSide"
import RightSide from "../../components/RightSide/RightSide"
import './Home.css'


const Home = () => {
    return (
      <div className='home'>
          <Profileside/>
          <PostSide/>
          <RightSide/>
      </div>
    )
  }
  
  export default Home