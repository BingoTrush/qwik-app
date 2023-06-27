<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="60" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>O1</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <span>O2</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="settings"></Icon>
                        <span>O3</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 5px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <QwikChild style="height: 600px">Content</QwikChild>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Define, Setup } from 'vue-class-setup';
import QwikChild from './vue-component/qwik-child.vue';
import { Layout, Sider, Menu, MenuItem, Header, Content, Breadcrumb, BreadcrumbItem, Card, Icon} from 'view-design';
@Setup
export class App extends Define<Props> {
    public count = 0;

    public isCollapsed = false

    public increment() {
        this.count++
    }

    public get menuitemClasses() {
        return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    }
}

export default defineComponent({
    name: "app",
    ...App.inject()
})
</script>

<script lang=ts setup>
export interface Props {
    title?: string
}
defineEmits();
defineProps<Props>();
</script>

<style lang="less">
.root {
    h1 {
        color: @--color-primary;
    }
}
</style>

