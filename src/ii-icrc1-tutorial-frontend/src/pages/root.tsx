import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import {
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, AnonymousIdentity, HttpAgent, Identity } from "@dfinity/agent";
import {
  createActor,
  ii_icrc1_tutorial_backend,
} from "../../../declarations/ii-icrc1-tutorial-backend";
import { useAuth } from "../lib/AuthContext";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

let actor = ii_icrc1_tutorial_backend;

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Members", icon: FiTrendingUp, link: "/members" },
  { name: "Profile", icon: FiCompass, link: "/account" },
  { name: "Settings", icon: FiSettings, link: "/settings" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [info, setInfo] = useState<{
    name: string;
    manifesto: string;
  } | null>(null);

  useEffect(() => {
    async function fetchInfo() {
      const name = await ii_icrc1_tutorial_backend.getName();
      const manifesto = await ii_icrc1_tutorial_backend.getManifesto();
      setInfo({ name, manifesto });
    }
    fetchInfo();
  }, []);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="900">
          {info?.name}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, link, children, ...rest }: NavItemProps) => {
  const location = useLocation();
  const isActive =
    link === "/"
      ? location?.pathname === link
      : location?.pathname.includes(link);
  return (
    <Link to={link}>
      <Box
        as="a"
        href="#"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          bg={isActive ? "cyan.400" : undefined}
          color={isActive ? "white" : undefined}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { state } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
        {state.isAuthenticated ? (
          <>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">Justina Clark</Text>
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue("white", "gray.900")}
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
                  <MenuDivider />
                  <MenuItem>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </>
        ) : (
          <>
            <Button colorScheme="blue" as={Link} to={"/signup"}>
              Sign up
            </Button>
            <Button colorScheme="gray">Login</Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [principal, setPrincipal] = useState<string | null>(null);

  const navigation = useNavigate();

  function refreshIdentity(identity: Identity) {
    setPrincipal(identity.getPrincipal().toString());
    const agent = Actor.agentOf(actor);
    if (!agent || !agent.replaceIdentity) {
      throw new Error("Agent not found");
    }
    agent.replaceIdentity(identity);
  }

  async function login() {
    const authClient = await AuthClient.create({
      idleOptions: {
        idleTimeout: 1000 * 60 * 30,
      },
    });
    if (!process.env.CANISTER_ID_DAO) {
      console.error("Project not found");
      return;
    }
    await new Promise((resolve) => {
      authClient.login({
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
        onSuccess: () => resolve(null),
      });
    });
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    actor = createActor(process.env.CANISTER_ID_DAO, {
      agent,
    });
    refreshIdentity(identity);
    navigation("/dashboard");
  }

  useEffect(() => {
    async function checkLoggedIn() {
      const authClient = await AuthClient.create({
        idleOptions: {
          idleTimeout: 1000 * 60 * 30,
        },
      });
      if (await authClient.isAuthenticated()) {
        refreshIdentity(authClient.getIdentity());
        navigation("/dashboard");
      }
    }
    checkLoggedIn();
  });

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
