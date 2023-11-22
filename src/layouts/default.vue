<script setup lang="ts">
import { NLayoutHeader, NMenu } from "naive-ui"
import type { MenuOption } from "naive-ui"
import { RouterLink } from "vue-router"

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/",
          class: "text-center mx-10",
          activeClass: "router-link-active"
        },
        () => "Realtime"
      ),
    key: "realtime-tracking"
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/history",
          class: "text-center mx-10",
          activeClass: "router-link-active"
        },
        () => "History"
      ),
    key: "History-tracking"
  }
]
</script>

<template>
  <NLayout position="absolute" class="w-full h-full" bordered>
    <NLayoutHeader bordered class="text-center flex items-center justify-between px-5" style="height: 64px">
      <div class="flex items-center">
        <div class="font-semibold text-lg font-jakarta">
          POC<span class="font-medium text-base pl-1">for PTPN</span>
        </div>
      </div>

      <NMenu mode="horizontal" :options="menuOptions" class="font-medium" />

      <div class="flex"></div>
    </NLayoutHeader>

    <NLayout position="absolute" style="height: calc(100% - 64px); top: 64px">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade-slide" mode="out-in" appear>
          <Component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </NLayout>
  </NLayout>
</template>

<style scoped>
#default-layout-sider:empty {
  display: none;
}

#default-layout-main {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

#default-layout-main.has-sider {
  width: calc(100% - 300px);
  left: 300px;
  top: 0;
}
</style>
