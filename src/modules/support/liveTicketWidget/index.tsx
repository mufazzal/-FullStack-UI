import LiveTicketWidget from './LiveTicketWidget'
import styled, { ThemedStyledFunction } from 'styled-components'
import { Theme } from '@modals/utils/theme'

const LiveTicketWidgetStyled: any = styled(LiveTicketWidget)`

  color: red;
  width: 400px;

  .ant-card {
    color: blue;
    background-color: ${({ theme }: { theme: Theme }) => theme.background};
    width: 400px;
  }`

export default LiveTicketWidgetStyled
