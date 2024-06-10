import React, {ReactNode} from "react";
import {SidebarToggleFunction} from "../layout-types";

export type MainContentProps = {
  children: ReactNode;
}

export function MainContent({children, setSidebarOpen}: MainContentProps & SidebarToggleFunction) {
  return (
    <div className="lg:pl-72">
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export function MainContentDark({children, setSidebarOpen}: MainContentProps & SidebarToggleFunction) {
  return (
    <div className="h-full bg-gray-800 lg:pl-72">
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export function MainContent2({children, setSidebarOpen}: MainContentProps & SidebarToggleFunction) {
  return (
    <div>
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}