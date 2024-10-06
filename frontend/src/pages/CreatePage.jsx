import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const handleInput = (e) => {
        setProduct(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const { createProduct } = useProductStore();
    const toast = useToast();
    const handleAddProduct = async () => {
        const { success, message } = await createProduct(product);

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            setProduct({
                name: "",
                price: "",
                image: ""
            });
        }

    }
    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={product.name}
                            onChange={handleInput}
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            value={product.price}
                            onChange={handleInput}
                        />
                        <Input
                            placeholder="Product Image"
                            name="image"
                            value={product.image}
                            onChange={handleInput}
                        />
                        <Button colorScheme="blue" w={"full"} onClick={handleAddProduct}>Add Product</Button>
                    </VStack>

                </Box>
            </VStack>

        </Container>
    )
}
export default CreatePage