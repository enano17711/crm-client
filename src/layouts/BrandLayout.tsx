import { ActionIcon, Center, Stack, Text, Title } from "@mantine/core"
import { IconBuildingHospital } from "@tabler/icons-react"

const BrandLayout = () => {
   return (
      <Center inline pb={5}>
         <ActionIcon color="indigo" size="xl" variant="light" mr={20}>
            <IconBuildingHospital size={25} />
         </ActionIcon>
         <Stack justify="center" spacing={0}>
            <Text
               inline
               variant="gradient"
               gradient={{ from: "indigo", to: "violet", deg: 45 }}
               fz="xs"
               fw={700}
            >
               Proyecto
            </Text>
            <Title
               ml="sm"
               order={2}
               variant="gradient"
               gradient={{ from: "indigo", to: "violet", deg: 70 }}
               fw={700}
            >
               Henry
            </Title>
         </Stack>
      </Center>
   )
}

export default BrandLayout
