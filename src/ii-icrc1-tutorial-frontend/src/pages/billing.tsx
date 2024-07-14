"use client";

import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import withAuth from "../lib/withAuth";
import { useAuth } from "../lib/AuthContext";
import { getPlan } from "../helpers/auth";
import { Plan } from "../helpers/types";
import {
  IcrcLedgerCanister,
  IcrcMetadataResponseEntries,
  IcrcTokenMetadataResponse,
} from "@dfinity/ledger-icrc";
import { createLedgerCanister } from "../helpers/ledger";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

function Page() {
  const { state } = useAuth();
  const [ledger, setLedger] = useState<IcrcLedgerCanister | null>(null);
  const [metadata, setMetadata] = useState<IcrcTokenMetadataResponse | null>(
    null
  );

  const plan = getPlan(state.user?.member!!)!!;

  const isFree = plan === Plan.Free;
  const isElite = plan === Plan.Elite;
  const isLegendary = plan === Plan.Legendary;

  const bg = useColorModeValue("gray.50", "gray.700");
  const mostP = useColorModeValue("red.300", "red.700");
  const mostPC = useColorModeValue("gray.900", "gray.300");

  useEffect(() => {
    async function setupLedger() {
      const ledger = await createLedgerCanister();
      const metadata = await ledger.metadata({});
      console.log(metadata);
      setLedger(ledger);
      setMetadata(metadata);
    }
    setupLedger();
  }, []);

  function getTokenSymbol() {
    if (!metadata) return "-";
    for (const value of metadata) {
      if (value[0] === IcrcMetadataResponseEntries.SYMBOL) {
        return (value[1] as any).Text;
      }
    }
    return "nil";
  }

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          No credit card needed, just pay with any ICRC-1 token.
        </Text>
      </VStack>
      {ledger && metadata ? (
        <>
          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            justify="center"
            spacing={{ base: 4, lg: 10 }}
            py={10}
          >
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Free
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    {getTokenSymbol()}
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    0
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={bg}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Can create 5 posts
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Can read posts
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="gray.500" />
                    Can use markdown editor
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    isDisabled={isFree}
                  >
                    {isFree ? "Current Plan" : "-"}
                  </Button>
                </Box>
              </VStack>
            </PriceWrapper>

            <PriceWrapper>
              <Box position="relative">
                <Box
                  position="absolute"
                  top="-16px"
                  left="50%"
                  style={{ transform: "translate(-50%)" }}
                >
                  <Text
                    textTransform="uppercase"
                    bg={mostP}
                    px={3}
                    py={1}
                    color={mostPC}
                    fontSize="sm"
                    fontWeight="600"
                    rounded="xl"
                  >
                    Most Popular
                  </Text>
                </Box>
                <Box py={4} px={12}>
                  <Text fontWeight="500" fontSize="2xl">
                    Elite
                  </Text>
                  <HStack justifyContent="center">
                    <Text fontSize="3xl" fontWeight="600">
                      {getTokenSymbol()}
                    </Text>
                    <Text fontSize="5xl" fontWeight="900">
                      10
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue("gray.50", "gray.700")}
                  py={4}
                  borderBottomRadius={"xl"}
                >
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Can create 50 posts
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Can read posts
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Can use markdown editor
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="blue" isDisabled={isElite}>
                      {isElite ? "Current Plan" : isLegendary ? "-" : "Upgrade"}
                    </Button>
                  </Box>
                </VStack>
              </Box>
            </PriceWrapper>
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Legendary
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    {getTokenSymbol()}
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    20
                  </Text>
                </HStack>
              </Box>
              <VStack
                bg={useColorModeValue("gray.50", "gray.700")}
                py={4}
                borderBottomRadius={"xl"}
              >
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Can create unlimited posts
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Can read posts
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Can use markdown editor
                  </ListItem>
                </List>
                <Box w="80%" pt={7}>
                  <Button
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    isDisabled={isLegendary}
                  >
                    {isLegendary ? "Current Plan" : "Upgrade"}
                  </Button>
                </Box>
              </VStack>
            </PriceWrapper>
          </Stack>
        </>
      ) : (
        <>
          <Center>
            <CircularProgress isIndeterminate color="blue.300" />
          </Center>
        </>
      )}
    </Box>
  );
}

const Billing = withAuth(Page);

export default Billing;
