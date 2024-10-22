import { People } from '@/data/people';
import { PeopleTable } from './components/PeopleTable';
import { useEffect } from 'react';
import { addPeople } from '@/redux/states/people';
import { useDispatch } from 'react-redux';

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPeople(People))
  }, [])
    return (
      <PeopleTable/>
    ) 
}

export default Home;
