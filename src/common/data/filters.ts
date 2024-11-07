import { Square } from 'lucide-react';
import { RectangleVertical } from 'lucide-react';
import { RectangleHorizontal } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';

export const filters = {
    orientation: [
        {
            id: 1,
            value: 'any',
            image: LayoutDashboard,
            isDisabled: true
        },
        {
            id: 2,
            value: 'landscape',
            image: RectangleHorizontal,
            isDisabled: true
        },
        {
            id: 3,
            value: 'portrait',
            image: RectangleVertical,
            isDisabled: true
        },
        {
            id: 4,
            value: 'squarish',
            image: Square,
            isDisabled: true
        }
    ],
    color: [
        {
            id: 1,
            value: 'any',
            image: '',
            symbol: ''
        },
        {
            id: 2,
            value: 'black_and_white',
            symbol: '☯'
        },
        {
            id: 3,
            value: 'black',
            image: 'black'
        },
        {
            id: 4,
            value: 'white',
            symbol: '⚬'
        },
        {
            id: 5,
            value: 'yellow',
            image: 'yellow'
        },
        {
            id: 6,
            value: 'orange',
            image: 'orange'
        },
        {
            id: 7,
            value: 'red',
            image: 'red'
        },
        {
            id: 8,
            value: 'purple',
            image: 'purple'
        },
        {
            id: 9,
            value: 'magenta',
            image: 'pink'
        },
        {
            id: 10,
            value: 'green',
            image: 'green'
        },
        {
            id: 11,
            value: 'teal',
            image: 'teal'
        },
        {
            id: 12,
            value: 'blue',
            image: 'blue'
        }
    ],
    sorted: [
        {
            id: 1,
            value: 'relevant'
        },
        {
            id: 2,
            value: 'latest'
        }
    ]
}