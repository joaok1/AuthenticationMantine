/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, TextField, useTable } from '@refinedev/antd';
import { Table, Space, Button, Tooltip } from 'antd';
import { IPost } from '../../interfaces/index';
import { useState } from 'react';
import { Delete, Preview, Edit } from '@mui/icons-material';

export function TableList({
  dataSource,
  onChange,
  column,
  actions,
}: {
  dataSource: any;
  actions: any;
  onChange: (page: number, sorter: any) => void;
  column: any;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { tableProps } = useTable<IPost>();
  const change = (pagination: any, filters: any, sorter: any) => {
    setCurrentPage(pagination.current);
    sorter.column
      ? onChange(pagination.current - 1, sorter)
      : onChange(pagination.current - 1, '');
  };
  const date = {
    pagination: {
      pageSize: 10,
      current: currentPage,
      total: dataSource?.totalElements,
    },
  };

  tableProps.dataSource = dataSource?.content;
  tableProps.loading = false;
  tableProps.pagination = date.pagination;

  const deletedate = (data: any) => {
    return console.log('value', data);
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id" onChange={change} bordered>
        {column.map((column: any, index: any) => (
          <Table.Column
            key={index}
            dataIndex={column.dataIndex}
            title={column.label}
            sorter={column.sorter}
            render={(value, record) => {
              const nestedProperty = column.dataIndex
                .split('.')
                .reduce(
                  (obj: { [x: string]: any }, key: string | number) => obj[key],
                  record
                );
              return <TextField value={nestedProperty} />;
            }}
          />
        ))}
        <Table.Column<IPost>
          title="Ações"
          dataIndex={actions}
          render={(_, record) => {
            const showAction = actions.find(
              (element: any) => element.label === 'Visualizar'
            );
            const editAction = actions.find(
              (element: any) => element.label === 'Editar'
            );
            const excluirAction = actions.find(
              (element: any) => element.label === 'Excluir'
            );
            return (
              <Space>
                {showAction && (
                  <Tooltip title="Visualizar">
                    <Button
                      icon={<Preview />}
                      type="link"
                      onClick={() => deletedate(record.id)}
                      size="small"
                    />
                  </Tooltip>
                )}
                {editAction && (
                  <Tooltip title="Editar">
                    <Button
                      icon={<Edit />}
                      type="link"
                      onClick={() => deletedate(record.id)}
                      size="small"
                    />
                  </Tooltip>
                )}
                {excluirAction && (
                  <Tooltip title="Excluir">
                    <Button
                      icon={<Delete />}
                      danger
                      type="link"
                      onClick={() => deletedate(record.id)}
                      size="small"
                    />
                  </Tooltip>
                )}
              </Space>
            );
            //   if (inseiriAction) {
            //     return (
            //       <Space>
            //         <ShowButton hideText size="small" recordItemId={record.id} />
            //       </Space>
            //     );
            //   }
            return null;

            //     <DeleteButton
            //         hideText
            //         size="small"
            //         recordItemId={record.id}
            //     />
            // </Space>
          }}
        />
      </Table>
    </List>
  );
}
