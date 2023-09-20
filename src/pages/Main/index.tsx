import { Container, Button } from '@mui/material';

const Main = () => {
  return (
    <main className='container'>
      <h1>Main Page</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
        praesentium perferendis in, nobis odit incidunt asperiores velit,
        veritatis hic minima fugiat rerum? Ut ad quos sequi esse adipisci?
        Fugiat, possimus.
      </p>
      <Container>
        <h1>Section</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          doloribus perferendis ratione, at suscipit consequuntur nam sed,
          assumenda expedita error temporibus vel fugit a doloremque quas,
          inventore alias sit quasi.
        </p>
        <Button variant='contained'>Contained</Button>
      </Container>
    </main>
  );
};

export default Main;
