import { ActionIcon, Avatar, Group } from "@mantine/core"
import { IconBell, IconBorderAll, IconMoon } from "@tabler/icons-react"

const ShortsHeaderLayout = () => {
   return (
      <Group spacing="xs">
         <ActionIcon color="dark.3" size="lg" radius="xl">
            <IconMoon />
         </ActionIcon>
         <ActionIcon color="dark.3" size="lg" radius="xl">
            <IconBorderAll />
         </ActionIcon>
         <ActionIcon color="dark.3" size="lg" radius="xl">
            <IconBell />
         </ActionIcon>
         <Avatar color="dark.3" radius="xl">
            Us
         </Avatar>
      </Group>
   )
}

export default ShortsHeaderLayout
