import usePlanInfo from '../../hooks/usePlanInfo';
import { useParams } from 'react-router-dom';
import {
  Checkbox,
  Grid,
  GridItem,
  Heading,
  Box,
  Flex,
  List,
  ListItem,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  Text,
} from '@chakra-ui/react';
import { Center } from '@chakra-ui/layout';

import { PieChart } from 'react-minimal-pie-chart';

import mockObj from './mockMealPlan.js';

let ingredientsArray = [];

let allIngredients = () => {
  mockObj.recipes.forEach((x) => ingredientsArray.push(x.ingredients));
};

allIngredients();

let shoppingListArray = [];

let shoppingListFormatter = () => {
  for (let i = 0; i < ingredientsArray.length; i++) {
    shoppingListArray.push(ingredientsArray[i].split(','));
  }
};

shoppingListFormatter();

let shoppingListObjectArray = [];

let shoppingListObjectCreator = () => {
  let flattenedList = shoppingListArray.flat();
  for (let i = 0; i < flattenedList.length; i++) {
    let tempArr = flattenedList[i].split('g ');
    let tempObj = { name: tempArr[1], weight: tempArr[0] };
    shoppingListObjectArray.push(tempObj);
  }
};

shoppingListObjectCreator();

console.log(shoppingListObjectArray);

const shoppingListDisplay = shoppingListObjectArray.map((item) => (
  <Box>
    <Checkbox colorScheme="teal" size="sm">
      {Math.round(item.weight)}{' '}
      {Math.round(item.weight) === 1 ? 'gram' : 'grams'} of{' '}
      {item.name === 'eg' ? 'egg' : item.name}
    </Checkbox>
  </Box>
));

export default function PlanInfo() {
  const { id } = useParams();
  const [planInfo] = usePlanInfo(id);
  console.log(planInfo.recipes);
  const data = [
    { title: 'Carbs', value: planInfo.carbs, color: '#FED7E2' },
    { title: 'Fat', value: planInfo.fat, color: '#FEEBC8' },
    { title: 'Protein', value: planInfo.protein, color: '#FC8181' },
  ];

  return (
    <>
      <Center>
        <Heading mt="4">Plan information for {planInfo.name}</Heading>
      </Center>
      <Grid
        h="80vh"
        m="4"
        templateRows="repeat(10, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={4}
          colSpan={4}
          bg="teal.50"
          border="2px"
          borderColor="gray.200"
          borderRadius="10"
        >
          <Center>
            <Heading size="md">Nutritional breakdown</Heading>
          </Center>

          <Flex h="100%" p="5">
            <Stat>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Calories
              </Badge>
              <StatLabel>Total Calories</StatLabel>
              <StatNumber>{planInfo.calories}</StatNumber>
            </Stat>
            <Stat>
              <Badge borderRadius="full" px="2" colorScheme="orange">
                Fat
              </Badge>
              <StatLabel>Total Fat </StatLabel>
              <StatNumber>{planInfo.fat}</StatNumber>
            </Stat>
            <Stat>
              <Badge borderRadius="full" px="2" colorScheme="pink">
                Carbs
              </Badge>
              <StatLabel>Total Carbs</StatLabel>
              <StatNumber>{planInfo.carbs}</StatNumber>
            </Stat>
            <Stat>
              <Badge borderRadius="full" px="2" colorScheme="red">
                Protein
              </Badge>
              <StatLabel>Total Protein</StatLabel>
              <StatNumber>{planInfo.protein}</StatNumber>
            </Stat>
            <Box>
              <Badge
                borderRadius="full"
                px="2"
                colorScheme="gray"
                variant="solid"
              >
                Macro Split
              </Badge>
              <PieChart
                data={data}
                label={({ dataEntry }) =>
                  Math.round(dataEntry.percentage) + '%'
                }
                labelStyle={{
                  fontSize: '15px',
                }}
                viewBoxSize={[100, 150]}
              />
            </Box>
          </Flex>
        </GridItem>
        <GridItem rowSpan={20} colSpan={2}>
          <Flex
            d="column"
            h="100%"
            p="5"
            overflow="scroll"
            border="2px"
            borderColor="gray.200"
            borderRadius="10"
            backgroundColor="teal.50"
          >
            <Heading>Shopping List</Heading>
            <List mt="5">
              <Stack spacing={4}>
                <ListItem>{shoppingListDisplay}</ListItem>
              </Stack>
            </List>
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={4}
          colSpan={4}
          bg="teal.50"
          border="2px"
          borderColor="gray.200"
          borderRadius="10"
        >
          <Center>
            <Heading size="sm">
              {mockObj.recipes[0].label} for breakfast
            </Heading>{' '}
          </Center>
          <List>
            <ListItem>
              <Text fontSize="sm">Calories: {mockObj.recipes[0].calories}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Fat: {mockObj.recipes[0].fat}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Carbs: {mockObj.recipes[0].carbs}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Protein: {mockObj.recipes[0].protein}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">
                Prep time: {mockObj.recipes[0].totalTime} minutes
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">
                Ingredients:{' '}
                {mockObj.recipes[0].ingredients.split(',').join(', ')}
              </Text>
            </ListItem>
          </List>
        </GridItem>
        <GridItem
          rowSpan={8}
          colSpan={4}
          bg="teal.50"
          border="2px"
          borderColor="gray.200"
          borderRadius="10"
        >
          <Center>
            <Heading size="sm">{mockObj.recipes[1].label} for lunch</Heading>{' '}
          </Center>
          <List>
            <ListItem>
              <Text fontSize="sm">Calories: {mockObj.recipes[1].calories}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Fat: {mockObj.recipes[1].fat}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Carbs: {mockObj.recipes[1].carbs}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Protein: {mockObj.recipes[1].protein}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">
                Prep time: {mockObj.recipes[1].totalTime} minutes
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">
                Ingredients:{' '}
                {mockObj.recipes[1].ingredients.split(',').join(', ')}
              </Text>
            </ListItem>
          </List>
        </GridItem>
        <GridItem
          rowSpan={4}
          colSpan={4}
          bg="teal.50"
          border="2px"
          borderColor="gray.200"
          borderRadius="10"
        >
          <Center>
            <Heading size="sm">{mockObj.recipes[2].label} for dinner</Heading>{' '}
          </Center>
          <List>
            <ListItem>
              <Text fontSize="sm">Calories: {mockObj.recipes[2].calories}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Fat: {mockObj.recipes[2].fat}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Carbs: {mockObj.recipes[2].carbs}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">Protein: {mockObj.recipes[2].protein}</Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">
                Prep time: {mockObj.recipes[2].totalTime} minutes
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="sm">
                Ingredients:{' '}
                {mockObj.recipes[2].ingredients.split(',').join(', ')}
              </Text>
            </ListItem>
          </List>
        </GridItem>
      </Grid>
    </>
  );
}
