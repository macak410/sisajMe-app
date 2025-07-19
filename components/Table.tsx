"use client";

import React, { createContext, useContext, ReactNode, FC } from "react";
import clsx from "clsx";

interface TableContextProps {
  columns: string;
}

interface TableProps {
  columns: string;
  children: ReactNode;
}

interface ChildrenProps {
  children: ReactNode;
}

interface BodyProps<T> {
  data: T[] | undefined;
  render: (item: T, index: number) => React.ReactNode;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

const Table: FC<TableProps> & {
  Header: FC<ChildrenProps>;
  Body: <T>(props: BodyProps<T>) => JSX.Element;
  Row: FC<ChildrenProps>;
  Footer: FC<ChildrenProps>;
} = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="border border-dark-700 bg-dark-500 rounded-2xl overflow-hidden"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

const Header: FC<ChildrenProps> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Zaglavlje se mora koristiti unutar tablice");
  }

  const { columns } = context;

  return (
    <header
      className={clsx(
        "grid gap-x-6 items-center transition-none p-4 bg-dark-400 border-b border-dark-700 text-white uppercase tracking-wide font-semibold"
      )}
      style={{ gridTemplateColumns: columns }}
      role="row"
    >
      {children}
    </header>
  );
};

const Row: FC<ChildrenProps> = ({ children }) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Redak se mora koristiti unutar tablice");
  }

  const { columns } = context;

  return (
    <div
      className={clsx("grid gap-x-6 items-center transition-none p-4")}
      style={{ gridTemplateColumns: columns }}
      role="row"
    >
      {children}
    </div>
  );
};

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (!data || data.length === 0)
    return (
      <p className="text-center p-6 font-medium">
        Trenutno nema podataka za prikaz
      </p>
    );

  return <section className="space-y-1">{data.map(render)}</section>;
};

const Footer: FC<ChildrenProps> = ({ children }) => {
  return (
    <footer className="bg-dark-400 flex justify-center p-4">{children}</footer>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
