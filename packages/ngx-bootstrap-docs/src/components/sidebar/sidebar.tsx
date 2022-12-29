import {component$, $, useRef, useOnWindow, useClientEffect$, useStore} from '@builder.io/qwik';
import * as React from 'react';
import SearchInput from "~/components/header/serach-input";
import {
  setRoutesCollection,
  SidebarRoutesType,
  SidebarRouteItemValueType,
  NestedRouteType,
  refactorPathName, refactorPathsNames, toggleMenuItem
} from "~/routing/routing";
import {useLocation, useNavigate} from "@builder.io/qwik-city";

interface IState {
  menuIsOpened: boolean;
  routesStructure: Partial<SidebarRoutesType>,
  openedItem: keyof SidebarRoutesType | null
}

export default component$(() => {
  const state = useStore<IState>({
    menuIsOpened: true,
    routesStructure: {},
    openedItem: null
  }, {recursive: true});

  const navigation = useNavigate();

  useClientEffect$(() => {
    // if (!Object.keys(state.routesStructure).length) {
      state.routesStructure = setRoutesCollection();
      console.log(state.routesStructure);
    // }

    if (state.menuIsOpened) {
      document.body.classList.add('menuIsOpened')
    }

    if (!state.menuIsOpened) {
      document.body.classList.remove('menuIsOpened')
    }
  });

  function getSideBarItemIsOpened (): string | keyof SidebarRoutesType {
    for (const item in state.routesStructure) {
      if (state.routesStructure[item as keyof SidebarRoutesType]?.isOpened) {
        return item as keyof SidebarRoutesType;
      }
    }

    return '';
  }

  const clickedMenuItem = $((value: string) => {
    console.log(state.routesStructure);
    // state.routesStructure = toggleMenuItem(value, state.routesStructure);
    toggleMenuItem(value, state.routesStructure);
    // if (state.routesStructure[value as keyof SidebarRoutesType]?.path) {
    //   navigation.path = `/${state.routesStructure[value as keyof SidebarRoutesType]?.path}` || '/'
    // }
    // console.log(state.routesStructure)
  });

  const clickedMenuSemiItem = $((semiMenu: NestedRouteType, nestedRoutes?: NestedRouteType[]) => {
    console.log(semiMenu);
    // @ts-ignore
    // console.log(state.routesStructure[semiMenu.parentRoute]?.nestedRoutes);
    // this.resetSemiMenu(nestedRoutes);
    // semiMenu.isOpened = true;
    // if (semiMenu.path) {
    //   this.router.navigate([semiMenu.path]);
      // this.closeAdaptiveMenu();
    // }
  })





  return (
    <div id="sidebar" className={`sidebar ${state.menuIsOpened ? 'menuIsOpened' : ''}`}>
      <div className="sidebar-search icon w-100">
        <button id="mobile-main-menu" type="button" className="align-self-baseline" onClick$={() => {state.menuIsOpened = !state.menuIsOpened}}>
          <img src="/images/icons/menu-left.svg" alt="left menu"/>
        </button>
        <div class="w-100">
          <SearchInput showInput={false}></SearchInput>
        </div>
      </div>

      <div className={`mobile-menu w-100 ${state.menuIsOpened ? 'menuIsOpened' : ''}`}>
        <div class="bootstrap-version transition-option">
          <span className={`transition-option ${!state.menuIsOpened ? 'hideText' : ''}`}>Bootstrap: </span>
        {/*<div class="flex-nowrap d-flex">*/}
        {/*  <button class="btn" type="button" className={`${}`} [class.selected]="_bsVersions.isBs4" (click)="installTheme('bs4')">4</button>*/}
        {/*<button class="btn" type="button" [class.selected]="_bsVersions.isBs5"  (click)="installTheme('bs5')">5</button>*/}
        {/*</div>*/}
        </div>
      </div>

      <div class="sidebar-content position-relative w-100">
        <ul className={'sidebar-list'}>
          {Object.keys(state.routesStructure).map( (item) =>{
             if (state.routesStructure[item as keyof SidebarRoutesType]?.title) {
               return <li
                 key={item}
                 onClick$={() => {
                   clickedMenuItem(item)
               }}
                 className={`
                 sidebar-item-main ${state.routesStructure[item as keyof SidebarRoutesType]?.isOpened ? 'active' : ''}
                 ${state.routesStructure[item as keyof SidebarRoutesType]?.nestedRoutes?.length && state.menuIsOpened ? 'icon' : ''}
                 `}
               >
                 <div className="sidebar-list-box">

                   <img src={
                     state.routesStructure[item as keyof SidebarRoutesType]?.icon
                   } alt="sidebar icon"/>
                   {state.routesStructure[item as keyof SidebarRoutesType]?.path && (
                     <span className={`transition-option ${!state.menuIsOpened ? 'hideText m-0' : ''}`}>
                      {state.routesStructure[item as keyof SidebarRoutesType]?.title}
                     </span>
                   )}
                   {!state.routesStructure[item as keyof SidebarRoutesType]?.path && (
                     <a className={`transition-option ${!state.menuIsOpened ? 'hideText m-0' : ''}`} href="javascript:void(0);">
                       {state.routesStructure[item as keyof SidebarRoutesType]?.title}
                     </a>
                   )}
                 </div>
               </li>
             }
          }
          )}
</ul>
        {/*<p>{!!getSideBarItemIsOpened()}</p>*/}
        {/*<p>{state.menuIsOpened}</p>*/}

        {/*{(state.menuIsOpened && !!getSideBarItemIsOpened()) && (*/}
        {/*  <ul className="sidebar-list scroll-list">*/}
        {/*    {*/}
        {/*      // @ts-ignore*/}
        {/*      state.routesStructure[getSideBarItemIsOpened() as keyof typeof SidebarRoutesType]?.nestedRoutes?.map(item => {*/}
        {/*        return (*/}
        {/*          <li className={'w-100'}>*/}
        {/*                <div className={*/}
        {/*                  `sidebar-list-box d-flex flex-column secondary-items*/}
        {/*                ${// @ts-ignore*/}
        {/*                    state.routesStructure[getSideBarItemIsOpened() as keyof typeof SidebarRoutesType]?.nestedRoutes[item] ? 'show' : ''}`*/}
        {/*                }>*/}
        {/*              /!*<p onClick$={clickedMenuSemiItem(item, state.routesStructure[getSideBarItemIsOpened() as keyof typeof SidebarRoutesType]?.nestedRoutes)} (click)="openSemiItemMenu(route, routesStructure[sideBarItemIsOpened].nestedRoutes)">{{route.title}}</p>*!/*/}
        {/*              <p onClick$={() => {*/}
        {/*                // @ts-ignore*/}
        {/*                clickedMenuSemiItem(item)*/}
        {/*              }*/}
        {/*              }>bla</p>*/}
        {/*            /!*  <div class="sidebar-list sidebar-list-fragment" [class.show]="route.isOpened" *ngIf="route.fragments.length">*!/*/}
        {/*            /!*    <div class="sidebar-item sidebar-item-fragment" *ngFor="let item of route.fragments" [class.active]="item.isOpened">*!/*/}
        {/*            /!*  <a [routerLink]="[route.path]" [queryParams]="{tab: item.path}" (click)="closeAdaptiveMenu()">{{item.title}}</a>*!/*/}
        {/*            /!*</div>*!/*/}
        {/*            /!*</div>*!/*/}
        {/*            </div>*/}
        {/*          </li>*/}
        {/*        )*/}
        {/*      })*/}
        {/*    }*/}

        {/*  </ul>*/}

        {/*)}*/}


</div>

</div>
  )
})

