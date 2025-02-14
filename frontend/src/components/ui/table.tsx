// src/components/ui/table.tsx
import React from "react";
import { cn } from "../../lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  variant?: "default" | "striped";
}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  return (
    <div className="w-full overflow-auto">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

export const TableFooter: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className, ...props }) => (
  <tfoot
    className={cn(
      "border-t bg-gray-50/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50",
      className
    )}
    {...props}
  />
);

export const TableHead: React.FC<
  React.ThHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => (
  <th
    className={cn(
      "h-12 px-2 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
);

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className, ...props }) => (
  <td
    className={cn("p-4 px-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);

export const TableCaption: React.FC<
  React.HTMLAttributes<HTMLTableCaptionElement>
> = ({ className, ...props }) => (
  <caption className={cn("mt-4 text-sm text-gray-500", className)} {...props} />
);
