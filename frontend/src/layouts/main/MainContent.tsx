import React, {ReactNode} from "react";
import {SidebarToggleFunction} from "../layout-types";

export type MainContentProps = {
  children: ReactNode;
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