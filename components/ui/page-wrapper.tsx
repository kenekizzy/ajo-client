"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Layout, Header, Main, Footer, Container } from "./layout"
import { Navigation, type NavigationItem } from "./navigation"

interface PageWrapperProps {
  children: React.ReactNode
  navigation?: {
    items: NavigationItem[]
    logo?: React.ReactNode
    actions?: React.ReactNode
  }
  footer?: React.ReactNode
  className?: string
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
}

const PageWrapper = React.forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ 
    children, 
    navigation, 
    footer, 
    className, 
    containerSize = "lg",
    ...props 
  }, ref) => {
    return (
      <Layout ref={ref} className={cn("flex flex-col", className)} {...props}>
        {navigation && (
          <Header>
            <Navigation
              items={navigation.items}
              logo={navigation.logo}
              actions={navigation.actions}
            />
          </Header>
        )}
        
        <Main className="flex-1">
          <Container size={containerSize}>
            {children}
          </Container>
        </Main>
        
        {footer && (
          <Footer>
            <Container size={containerSize}>
              {footer}
            </Container>
          </Footer>
        )}
      </Layout>
    )
  }
)
PageWrapper.displayName = "PageWrapper"

export { PageWrapper }