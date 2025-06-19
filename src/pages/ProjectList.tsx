import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

// _mock_
// components
import Page from 'components/Page';
// hooks
// _types

// @mui
import { Box, CardMedia, Container, Divider, Grid } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import LoadingScreen from 'components/LoadingScreen';
import Scrollbar from 'components/Scrollbar';
import useSettings from 'hooks/useSettings';
import { getBreed, randomBreed } from 'redux/slices/breed';
import { useDispatch, useSelector } from 'redux/store';

// ----------------------------------------------------------------------
const limit = 10;
export default function ProjectList() {
  const { themeStretch } = useSettings();
  const slider = useRef<Slider | null>(null);

  const dispatch = useDispatch();
  const { breed, nextBreed, isLoading } = useSelector((state) => state.breed);

  const [breedList, setBreedList] = useState<any>([]);
  // const onchangeBreed = (direction: string) => {
  //   console.log(direction, 'direction');
  // };

  const settings = {
    dots: false,
    arrows: false,
    swipeToSlide: true,
    focusOnSelect: false,
    variableWidth: false,
    beforeChange: (oldIndex: any, newIndex: any) => {
      console.log(`Before change: from slide ${oldIndex} to ${newIndex}`);
    },
    afterChange: (currentSlide: any) => {
      console.log(`After change: current slide is ${currentSlide}`);
    },
    onEdge: (direction: any) => {
      console.log(`Reached edge: ${direction}`);
    },
  };

  useEffect(() => {
    dispatch(getBreed(limit, 0));
    dispatch(randomBreed());
  }, [dispatch]);

  useEffect(() => {
    if (nextBreed?.length) {
      setBreedList(nextBreed);
    }
  }, [breed]);


  console.log(breedList,"");
  
  return (
    <Page title="DogFinder">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="DogFinder" sx={{ marginBottom: 0 }} links={[]} />
        <Divider />
        <Scrollbar>
          <Grid container sx={{ backgroundColor: '#F5F5F5', padding: '50px' }} spacing={2}>
            <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
              {breedList?.length > 0 && (
                <Slider {...settings} ref={slider}>
                  {breedList?.map((item: any) => (
                    // <Image
                    //   key={item?.image?.id}
                    //   alt="large image"
                    //   src={item?.image?.url}
                    //   ratio="1/1"
                    //   onClick={() => {}}
                    //   sx={{ cursor: 'zoom-in' }}
                    // />
                    <CardMedia
                      key={item?.id}
                      component="img"
                      sx={{ height: 500, width: 200 }}
                      image={item?.url}
                      alt="loc loc"
                    />
                    // <img height={100} width={100} key={item?.image?.id} src={item?.image?.url}  alt='green iguana'/>
                    // <CardMedia
                    //   sx={{ height: 140 }}
                    //   image={breedList[0]?.image?.url}
                    //   title="green iguana"
                    // />

                    // <img height={100} width={100} key={item?.image?.id} src={item?.image?.url}  alt='green iguana'/>
                  ))}
                </Slider>
              )}
            </Box>
          </Grid>
        </Scrollbar>
        {isLoading && <LoadingScreen />}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
