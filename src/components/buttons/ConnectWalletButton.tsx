import {
  Text,
  Button,
  Image,
  Box,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverFooter,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Avatar,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

// import { useConnectModal, useAccountModal, useChainModal, } from "@rainbow-me/rainbowkit";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AllNFTNames from "src/components/userName/AllNFTNames";
import MintNFTName from "src/components/userName/MintNFTName";

type Props = {
  connectWalletPressedProp: any;
  walletAddressProp: string;
};
const ConnectWalletButton = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ userName, setUserName ] = useState("");

  // const { openConnectModal } = useConnectModal();
  // const { openAccountModal } = useAccountModal();
  // const { openChainModal } = useChainModal();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        // authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = (mounted || '').toString() !== "loading";
        // const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain;
        // && (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <Box>
            {(() => {
              if (!connected) {
                return (
                  <Button
                    width="15vw"
                    variant="outline"
                    bgGradient="linear(to-l, brand.100, brand.200)"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    width="15vw"
                    variant="outline"
                    bgGradient="linear(to-l, brand.100, brand.200)"
                    onClick={openChainModal}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <VStack>
                  <Box width="15vw">
                    <Popover>
                      <PopoverTrigger
                      // display="flex"
                      // flexDirection="row"
                      // alignItems="center"
                      // justifyContent="space-around"
                      >
                        <HStack
                          _hover={{
                            background: "grey",
                            transition: "all 0.7s",
                            transform: "scale(1.005)",
                          }}
                          rounded="lg"
                        >
                          <Avatar
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                          />
                          <VStack spacing={1}>
                            <Text as="b" noOfLines={1} color="red.500">
                              {userName}
                            </Text>
                          </VStack>
                        </HStack>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>
                          <Avatar
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                          />{" "}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <AllNFTNames setUserName={setUserName} />
                          <Box m={5} />
                          <Button onClick={onOpen}>Mint Username</Button>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Mint Username</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <MintNFTName />
                              </ModalBody>

                              <ModalFooter />
                            </ModalContent>
                          </Modal>
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            onClick={openAccountModal}
                            width="15vw"
                            variant="outline"
                            bgGradient="linear(to-l, brand.100, brand.200)"
                          >
                            {account.displayName}
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </Box>

                  <Button
                    onClick={openChainModal}
                    width="15vw"
                    variant="outline"
                    bgGradient="linear(to-l, brand.100, brand.200)"
                  >
                    {chain.hasIcon && (
                      <Box
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </Box>
                    )}
                    {chain.name}
                  </Button>
                </VStack>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
