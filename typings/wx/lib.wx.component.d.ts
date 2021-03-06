/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

type PropertyType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ObjectConstructor
  | ArrayConstructor
  | null;

declare interface PropertyOption {
  /** ???????????? */
  type: PropertyType;
  /** ??????????????? */
  value: any;
  /** ???????????????????????????????????? */
  observer?(
    newVal?: any,
    oldVal?: any,
    changedPath?: Array<string | number>,
  ): void;
  optionalTypes?: PropertyType[];
}

declare interface TriggerEventOption {
  /** ??????????????????
   *
   * ???????????? `false`
   */
  bubbles?: boolean;
  /** ??????????????????????????????????????????false?????????????????????????????????????????????????????????????????????????????????????????????
   *
   * ???????????? `false`
   */
  composed?: boolean;
  /** ??????????????????????????????
   *
   * ???????????? `false`
   */
  capturePhase?: boolean;
}

declare interface WxComponent extends BaseComponent {
  /** ????????????????????? */
  is: string;
  /** ??????id */
  id: string;
  /** ??????dataset */
  dataset: string;
  /** ???????????????**??????????????????????????????** */
  data: IAnyObject;
  /** ???????????????**??????????????????????????????**?????? `data` ????????? */
  properties: {
    [propertyName: string]: PropertyOption;
  };

  /** ??????data???????????????????????? */
  setData(
    /** ????????????????????????
     *
     * ??? `key: value` ????????????????????? `this.data` ?????? `key` ????????????????????? `value`???
     *
     * ?????? `key` ?????????????????????????????????????????????????????????????????????????????????????????????????????? `array[2].message`???`a.b.c.d`????????????????????? this.data ??????????????????
     */
    data: IAnyObject,
    /** setData???????????????????????????????????????????????????????????????????????? `1.5.0` */
    callback?: (data: IAnyObject) => void,
  ): void;
  /** ???????????????????????? `behavior` ????????????????????????????????????????????????????????????behavior??? */
  hasBehavior(behavior: object): void;
  /** ????????????????????????????????? */
  triggerEvent(name: string, detail: object, options: TriggerEventOption): void;
  /** ???????????? SelectorQuery ?????????????????????????????????????????????????????? */
  createSelectorQuery(): wx.SelectorQuery;
  /** ???????????? IntersectionObserver ?????????????????????????????????????????????????????? */
  createIntersectionObserver(
    options: wx.CreateIntersectionObserverOption,
  ): wx.IntersectionObserver;
  /** ???????????????????????????????????????????????????????????????????????????????????????????????? `wx://component-export` ????????? */
  selectComponent(selector: string): WxComponent;
  /** ??????????????????????????????????????????????????????????????????????????????????????????????????? */
  selectAllComponents(selector: string): WxComponent[];
  /** ????????????????????????????????????????????????????????? ??????????????? */
  getRelationNodes(relationKey: string): WxComponent[];
  /** ???????????? callback ?????????????????? setData ??????????????????????????????????????????????????????????????????????????????????????????????????? setData ??????????????????????????????*/
  groupSetData(callback?: () => void): void;
  /** ????????????????????? custom-tab-bar ??????????????? */
  getTabBar(): WxComponent;
}

declare interface ComponentLifetimes {
  /** ??????????????????????????????????????????????????????????????????????????????????????????????????? `setData` */
  created?(this: WxComponent): void;
  /** ???????????????????????????????????????????????????????????????????????? */
  attached?(this: WxComponent): void;
  /** ??????????????????????????????????????????????????????????????????????????????????????????????????? [SelectorQuery]((SelectorQuery))??? */
  ready?(this: WxComponent): void;
  /** ??????????????????????????????????????????????????????????????????????????????????????? */
  moved?(this: WxComponent): void;
  /** ?????????????????????????????????????????????????????????????????????????????? */
  detached?(this: WxComponent): void;
  /** ?????????????????????????????????????????????????????????????????? */
  error?(error: Error): void;
}

declare interface PageLifetimes {
  /** ?????????????????????????????????????????????
   *
   * ????????????/????????????????????????
   */
  show?(this: Page.PageInstance): void;
  /** ?????????????????????????????????????????????
   *
   * ????????????/???????????????????????? ??? `navigateTo` ????????? `tab` ???????????????????????????????????????????????????
   */
  hide?(this: Page.PageInstance): void;
  /** ???????????????????????????????????????????????????
   *
   * ?????????????????????????????????
   */
  resize?(Size?: Page.IResizeOption): void;
}

declare interface RelationOption {
  /** ??????????????????????????? */
  type: 'parent' | 'child' | 'ancestor' | 'descendant';
  /** ???????????????????????????????????????????????????????????????????????????????????????????????????attached?????????????????? */
  linked?(target: WxComponent): any;
  /** ??????????????????????????????????????????????????????????????????????????????????????????????????????moved?????????????????? */
  linkChanged?(target: WxComponent): any;
  /** ??????????????????????????????????????????????????????????????????????????????????????????detached?????????????????? */
  unlinked?(target: WxComponent): any;
  /** ???????????????????????????????????????????????????????????????????????????behavior?????????????????????behavior?????????????????????????????? */
  target?: string;
}

type DefinitionFilter = (
  defFields: WxComponent,
  definitionFilterArr?: DefinitionFilter[],
) => void;

declare interface ComponentOptions {
  multipleSlots?: boolean;
  addGlobalClass?: boolean;
}

declare interface BaseComponent extends ComponentLifetimes {
  /** ??????????????????????????????????????????????????????????????? */
  properties?: {
    [propertyName: string]: PropertyOption;
  };
  /** ??????????????????????????? `properties` ????????????????????????????????? */
  data?: IAnyObject;
  /** ?????????????????????????????????????????? properties ??? data ????????? */
  observers?: IAnyObject;
  /** object?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? [????????????](events.md) */
  methods?: {
    [methodName: string]: (this: WxComponent) => any;
  };
  /** ?????????mixins???traits??????????????????????????????????????? [behaviors](behaviors.md) */
  behaviors?: string[];
  /** ?????????????????????????????? [???????????????](relations.md) */
  relations?: {
    [componentName: string]: RelationOption;
  };
  /** ??????????????????????????????????????? [???????????????](wxml-wxss.md) */
  externalClasses?: string[];
  /** ??????????????????????????????????????????????????????????????????????????????????????????????????? */
  options?: ComponentOptions;
  /** ?????????????????????????????????????????????????????????`created`???`attached`???`ready`???`moved`???`detached` ???????????? `lifetimes` ???????????????????????????????????????????????????????????????????????????????????????????????? `lifetimes` ????????????????????????????????????
   *
   * ?????????????????? `2.2.3` */
  lifetimes?: ComponentLifetimes;
  /** ???????????????????????????????????????????????????????????????????????? `show` ??? `hide` ??????????????????
   *
   * ?????????????????? `2.2.3` */
  pageLifetimes?: PageLifetimes;
  /** ????????????????????????????????????????????????????????? [?????????????????????](extend.md)
   *
   * ?????????????????? `2.2.3` */
  definitionFilter?: DefinitionFilter;
}

/** Component???????????????????????????????????????Component???????????????????????????????????????????????????????????????
 *
 * * ?????? `this.data` ?????????????????????????????????????????????????????????????????????????????? `setData` ?????????
 * * ???????????????????????????????????????????????? `this` ????????????
 * * ????????????????????? data ??????????????????????????? `dataXyz` ??????????????????????????? WXML ?????? `data-xyz=""` ?????????????????? dataset ????????????????????????????????????
 * * ???????????????????????????????????????????????????????????? data ??????????????????????????????????????????????????????????????????????????????
 * * ???????????? `2.0.9` ????????????????????????????????? data ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * * `bug` : ?????? type ??? Object ??? Array ?????????????????????????????????????????? `this.setData` ??????????????????????????????????????????????????????????????? observer ?????? observer ???????????? `newVal` ???????????????????????????????????? `oldVal` ????????? `changedPath` ??????????????????????????????????????????
 */
declare function Component(
  /** ??????????????????????????? */ options: BaseComponent,
): void;
