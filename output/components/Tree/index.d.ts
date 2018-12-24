import * as React from "react";
export interface Item {
    name?: string;
    id?: number;
    parentId?: number;
    order?: string;
    items?: Item[];
    edit?: boolean;
    drag?: boolean;
    add?: boolean;
    active?: boolean;
    count?: number;
}
export interface Iprops {
    list?: Item[];
    dragActive?: (res: boolean, data: {
        parentId?: number;
        id: number;
        order: string;
    }) => Promise<boolean>;
    add?: (name: string, parentId: number, order: string) => void;
    del?: (id: number) => void;
    edit?: (name: string, id: number) => void;
    selectTag?: (name: string, id: number) => void;
    showCount?: boolean;
    showIcon?: boolean;
}
export interface Istates extends Iprops {
    addName?: string;
    addActive?: boolean;
    editName?: string;
    editActive?: boolean;
    dragInfo?: {
        parentId?: number;
        id: number;
        order: string;
    };
    drag?: boolean;
    active?: boolean;
    addId?: number;
}
export declare class Tree extends React.Component<Iprops, Istates> {
    private tree?;
    private list?;
    constructor(props: Iprops);
    componentWillReceiveProps(props: Iprops): void;
    render(): JSX.Element;
    protected serialize(list: Item[], i?: number, active?: boolean): JSX.Element;
    protected orderArray: (item1: any, item2: any) => number;
    protected arrayToJson: (data: Item[], parentId?: number) => Item[];
    protected getJson: (data: Item[]) => Item[];
    protected getElementInfo: (target: HTMLElement) => {
        id: number;
        name: string;
        parentId: number;
        order: string;
    };
    protected toogle(id: number, state?: boolean): void;
    protected add(e: React.ChangeEvent<HTMLButtonElement>, id: number): void;
    protected edit(e: React.ChangeEvent<HTMLButtonElement>, id: number): void;
    protected del(e: React.ChangeEvent<HTMLButtonElement>, id: number): void;
    protected drag(e: React.ChangeEvent<HTMLButtonElement>, id: number): void;
    protected up(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId: number): void;
    protected down(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId: number): void;
    protected left(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId?: number): void;
    protected right(e: React.MouseEvent<HTMLSpanElement>, id: number, parentId?: number): void;
    protected moveQuest(): void;
    protected moveCancel(): void;
    protected arrayDeep(array: Item[]): boolean;
}
